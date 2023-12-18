package com.crop.service;

import java.util.List;

import com.crop.entity.Address;
import com.crop.entity.Crop;
import com.crop.entity.Order;
import com.crop.entity.Payment;

public interface PaymentService {

	
	Payment getPaymentById(String paymentId);

	List<Payment> getAllPayments();

	

	String deletePayment(String paymentId);

	Payment updatePayment(String paymentId, Payment payment);


	Payment addPayment(Payment payment, String buyerId, String cartId);

	List<Crop> getCropsByCartId(String cartId);



	

	
	

}
