//package com.crop.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.crop.entity.Order;
//import com.crop.entity.Payment;
//import com.crop.service.OrderService;
//
//@RestController
//@RequestMapping("/orders")
//@CrossOrigin(origins = "http://localhost:3000")
//public class OrderController {
//	
//	
//	
//	@Autowired
//	OrderServic8e orderService;
//	
//	@PostMapping("/placeOrder/{paymentId}")
//    public Order addOrder(@RequestBody Order order, @PathVariable String paymentId) {
//   
//		order.setPaymentId(paymentId);
//		
//      
//        return orderService.addOrder(order, paymentId );
//    }
//	
//}
