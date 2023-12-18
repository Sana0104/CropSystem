//package com.crop.controller;
//
//import org.bson.types.ObjectId;
//import org.springframework.core.convert.converter.Converter;
//
//public class ObjectIdToLongConverter implements Converter<ObjectId, Long> {
//    @Override
//    public Long convert(ObjectId objectId) {
//        if (objectId != null) {
//        	long timestamp = objectId.getTimestamp();
//        	return timestamp;
//
//        }
//        return null;
//    }
//}
//
