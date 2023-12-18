package com.crop.serviceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.crop.entity.Address;
import com.crop.entity.Crop;
import com.crop.entity.Order;
import com.crop.entity.Payment;
import com.crop.entity.Transaction;
import com.crop.entity.User;
import com.crop.exception.BuyerNotFoundException;
import com.crop.exception.CartNotFoundException;
import com.crop.exception.PaymentNotFoundException;
import com.crop.repository.PaymentRepository;
import com.crop.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private static final String USER_SERVICE_URL = "http://localhost:9095"; // Assuming the URL of the UserService
    private static final String TRANSACTION_SERVICE_URL = "http://localhost:9097"; // Assuming the URL of the TransactionService

    @Autowired
    private PaymentRepository paymentRepository;
   

    @Autowired
    private RestTemplate restTemplate;
  
    @Override
    public Payment addPayment(Payment payment, String buyerId, String cartId) {
        try {
            // Fetch buyer details from User service
            String userUrl = USER_SERVICE_URL + "/user/fetch/" + buyerId;
            ResponseEntity<User> userResponse = restTemplate.getForEntity(userUrl, User.class);
            User user = userResponse.getBody();
            if (user == null) {
                throw new BuyerNotFoundException("Buyer not found with ID: " + buyerId);
            }

            // Fetch cart details from Cart service
            String cartUrl = TRANSACTION_SERVICE_URL + "/transaction/getCropsByCartId/" + cartId;
            ResponseEntity<List<Transaction>> cartResponse = restTemplate.exchange(
                cartUrl, HttpMethod.GET, null, new ParameterizedTypeReference<List<Transaction>>() {}
            );
            List<Transaction> cart = cartResponse.getBody();
            if (cart == null || cart.isEmpty()) {
                throw new CartNotFoundException("Cart not found with ID: " + cartId);
            }

            // Set the fetched buyerId and cartId to the payment
            payment.setBuyerId(buyerId);
            payment.setCartId(cartId);

            // Set the payment date
            payment.setPaymentDate(new Date());

            // Save the payment in the repository
            return paymentRepository.save(payment);
        } catch (BuyerNotFoundException | CartNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException("An error occurred while processing the request.", ex);
        }
    }



    @Override
    public Payment getPaymentById(String paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + paymentId));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment updatePayment(String paymentId, Payment payment) {
        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + paymentId));
        // Update existingPayment with new fields from payment if required
        // For example: existingPayment.setField(payment.getField());
        return paymentRepository.save(existingPayment);
    }

    @Override
    public String deletePayment(String paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + paymentId));
        paymentRepository.delete(payment);
        return "Payment with ID " + paymentId + " deleted successfully";
    }



	@Override
	public List<Crop> getCropsByCartId(String cartId) {
		String cartUrl = TRANSACTION_SERVICE_URL + "/transaction/getCropsByCartId/" + cartId;
        ResponseEntity<List<Crop>> cartResponse = restTemplate.exchange(
            cartUrl, HttpMethod.GET, null, new ParameterizedTypeReference<List<Crop>>() {}
        );
        return cartResponse.getBody();
	}
	


}
