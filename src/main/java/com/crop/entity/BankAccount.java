package com.crop.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BankAccount {

	  @JsonProperty("cardNumber")
	    private String cardNumber;

	    @JsonProperty("bankName")
	    private String bankName;

	    @JsonProperty("ifscCode")
	    private String ifscCode;
}
