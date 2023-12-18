package com.crop.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="orders")
public class Order {

	private String paymentId;
    private LocalDate orderDate;
    private String orderStatus;		
    private List<Crop> crops = new ArrayList<>();
    private double totalAmount;
    private String buyerId;
	public void getCrops(List<Crop> crops2) {
		
		
	}
    
}

