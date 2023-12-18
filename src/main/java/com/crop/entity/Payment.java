package com.crop.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection="Payment")
public class Payment {
	@Id
	private String paymentId;
	private double totalAmount;
	private String paymentMode;
	private BankAccount bankAccount;
	private Date paymentDate;
	private String buyerId;
	private String cartId;

	
	

}
