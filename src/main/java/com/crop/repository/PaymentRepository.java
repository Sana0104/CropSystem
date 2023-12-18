package com.crop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.crop.entity.Crop;
import com.crop.entity.Payment;



public interface PaymentRepository extends MongoRepository<Payment, String> {

	List<Payment> findAllByBuyerId(String buyerId);
	//List<Crop> getCropsByCartId(String cartId);

}
