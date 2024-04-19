package config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@Converter(autoApply = true)
public class ImageConverter implements AttributeConverter<BufferedImage, Blob> {
    @Override
    public Blob convertToDatabaseColumn(BufferedImage image) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "jpg", outputStream);
            byte[] imageBytes = outputStream.toByteArray();
            return new javax.sql.rowset.serial.SerialBlob(imageBytes);
        } catch (IOException | SQLException e) {
            throw new RuntimeException("Error converting image to Blob", e);
        }
    }

    @Override
    public BufferedImage convertToEntityAttribute(Blob blob) {
        try {
            byte[] imageBytes = blob.getBytes(1, (int) blob.length());
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
            return ImageIO.read(inputStream);
        } catch (IOException | SQLException e) {
            throw new RuntimeException("Error converting Blob to image", e);
        }
    }
}
