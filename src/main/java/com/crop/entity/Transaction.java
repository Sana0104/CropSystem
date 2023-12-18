package com.crop.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class Transaction {
	
	@Id
	private String cartId;
	
	
	private List<Crop> crops = new ArrayList<>();
	 
	private String buyerId;
	private double quantity;
	private double totalPrice;
	private Date transactionDate;
	
}