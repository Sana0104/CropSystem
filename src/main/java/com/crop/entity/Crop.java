package com.crop.entity;

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

public class Crop {
	@Id
	private String id;
	private String cropName;
	private String cropType;
	private String description;
	private double price;
    private double  quantity; 
    private String location;
    private String image;
    private String sellerName;
   

}
