package com.crop;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.crop.entity.Crop;
import com.crop.entity.Payment;
import com.crop.entity.Transaction;
import com.crop.entity.User;
import com.crop.exception.BuyerNotFoundException;
import com.crop.exception.CartNotFoundException;
import com.crop.exception.PaymentNotFoundException;
import com.crop.repository.PaymentRepository;
import com.crop.service.PaymentService;
import com.crop.serviceImpl.PaymentServiceImpl;

@SpringBootTest
public class PaymentTest {

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @Mock
    private PaymentRepository paymentRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetPaymentById() {
        Payment payment = new Payment();
        payment.setPaymentId("1");
        when(paymentRepository.findById("1")).thenReturn(Optional.of(payment));
        Payment result = paymentService.getPaymentById("1");
        assertEquals("1", result.getPaymentId());
    }

    @Test
    public void testGetAllPayments() {
        List<Payment> payments = new ArrayList<>();
        Payment payment1 = new Payment();
        payment1.setPaymentId("1");
        Payment payment2 = new Payment();
        payment2.setPaymentId("2");
        payments.add(payment1);
        payments.add(payment2);
        when(paymentRepository.findAll()).thenReturn(payments);
        List<Payment> result = paymentService.getAllPayments();
        assertEquals(2, result.size());
    }

    @Test
    public void testUpdatePayment() {
        Payment payment = new Payment();
        payment.setPaymentId("1");
        when(paymentRepository.findById("1")).thenReturn(Optional.of(payment));
        when(paymentRepository.save(payment)).thenReturn(payment);
        Payment result = paymentService.updatePayment("1", payment);
        assertEquals("1", result.getPaymentId());
    }

    @Test
    public void testDeletePayment() {
        Payment payment = new Payment();
        payment.setPaymentId("1");
        when(paymentRepository.findById("1")).thenReturn(Optional.of(payment));
        String result = paymentService.deletePayment("1");
        assertEquals("Payment with ID 1 deleted successfully", result);
    }

}

