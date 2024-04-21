package com.example.hack_2024_donstu.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import jakarta.persistence.AttributeConverter;

import java.io.IOException;
import java.util.ArrayList;

public class ArrayListConverter implements AttributeConverter<ArrayList<Integer>, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ArrayList<Integer> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Ошибка при преобразовании ArrayList в JSON", e);
        }
    }

    @Override
    public ArrayList<Integer> convertToEntityAttribute(String dbData) {
        try {
            CollectionType type = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, Integer.class);
            return objectMapper.readValue(dbData, type);
        } catch (IOException e) {
            throw new RuntimeException("Ошибка при преобразовании JSON в ArrayList", e);
        }
    }
}
