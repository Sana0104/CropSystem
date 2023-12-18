package com.crop.entity;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class User {
		
	private String id;
    private String userName;
    private String userEmail;
	private String userPassword;
	private long   mobileNumber;
	private String role;
	
	
  
}
