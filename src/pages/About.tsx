import { Box, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        About Picasso Restaurant
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Picasso Restaurant, where culinary art meets passion. We take
        pride in serving dishes crafted with the finest ingredients and utmost
        care.
      </Typography>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Address:</strong> 123 Culinary Street, Food City, Gourmetland
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Phone:</strong> +1 (234) 567-890
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Email:</strong> info@picassorestaurant.com
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Hours of Operation
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Monday - Friday:</strong> 10:00 AM - 10:00 PM
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Saturday - Sunday:</strong> 9:00 AM - 11:00 PM
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in 1998, Picasso Restaurant has been a cornerstone of gourmet
          dining. Our mission is to blend tradition with innovation, delivering
          unforgettable culinary experiences to every guest.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
