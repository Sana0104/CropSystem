package com.crop.controller;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crop.entity.Address;
import com.crop.entity.Crop;
import com.crop.entity.Order;
import com.crop.entity.Payment;
import com.crop.repository.PaymentRepository;
import com.crop.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:3000")
//payment service
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/addPayment/{buyerId}/{cartId}")
    public Payment addPayment(@RequestBody Payment payment, @PathVariable String buyerId, @PathVariable String cartId) {
   
        payment.setBuyerId(buyerId);
        payment.setCartId(cartId);
      
        return paymentService.addPayment(payment, buyerId, cartId);
    }
    @GetMapping("/getPayment/{paymentId}")
    public Payment getPaymentById(@PathVariable String paymentId) {
        return paymentService.getPaymentById(paymentId);
    }

    @GetMapping("/getAllPayments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PutMapping("updatePayment/{paymentId}")
    public Payment updatePayment(@PathVariable String paymentId, @RequestBody Payment payment) {
        return paymentService.updatePayment(paymentId, payment);
    }

    @DeleteMapping("deletePayment/{paymentId}")
    public String deletePayment(@PathVariable String paymentId) {
        return paymentService.deletePayment(paymentId);
    }
    @GetMapping("/getOrderByPaymentId/{paymentId}")
    public ResponseEntity<Order> getOrderByPaymentId(@PathVariable String paymentId) {
        Payment payment = paymentService.getPaymentById(paymentId);
        List<Crop> crops = paymentService.getCropsByCartId(payment.getCartId());  
        Order order = new Order();
        order.setPaymentId(payment.getPaymentId());
        order.setTotalAmount(payment.getTotalAmount());
        order.setBuyerId(payment.getBuyerId());
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus("Placed");
        order.setCrops(crops);

        return ResponseEntity.ok(order);
    }
    @GetMapping("/getCropsByCartId/{cartId}")
    public List<Crop> getCropsByCartId(@PathVariable String cartId) {
        return paymentService.getCropsByCartId(cartId);
    }

    @GetMapping("/getAllOrdersByBuyerId/{buyerId}")
    public List<Order> getAllOrdersByBuyerId(@PathVariable String buyerId) {
        List<Payment> payments = paymentRepository.findAllByBuyerId(buyerId);
        List<Order> orders = new ArrayList<>();

        for (Payment payment : payments) {
            Order order = new Order();
            order.setPaymentId(payment.getPaymentId());
            order.setTotalAmount(payment.getTotalAmount());
            order.setOrderDate(LocalDate.now());
            order.setOrderStatus("Placed");
            List<Crop> crops = paymentService.getCropsByCartId(payment.getCartId());  
            order.setCrops(crops);

            // Add any additional logic here if necessary

            orders.add(order);
        }

        return orders;
    }


}


