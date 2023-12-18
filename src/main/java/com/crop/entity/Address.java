package com.crop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Address {
	private String city;
	private long pinCode;
	private String State;
	private long houseNumber;
	private String area;

}
