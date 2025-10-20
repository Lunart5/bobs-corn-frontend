import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Alert,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { toast } from "react-toastify";
import { purchaseService } from "../../services/purchase.services";
import axios from "axios";
import { loading_text } from "../../utils/constants";
import { useCountDown } from "../../hooks/useCountDown";

export default function BuyMaiz() {
  const [loading, setLoading] = useState(false);

  const { countdown, rateRetryAfter, isCountdownActive, startCountdown } =
    useCountDown();

  const buttonText = loading
    ? loading_text
    : isCountdownActive
    ? `Please wait ${countdown} seconds`
    : "Shop Now";

  const handleBuy = async () => {
    setLoading(true);
    try {
      await purchaseService.postPucharse();
      toast.success("Purchase Completed Successfully!");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = error.response.data?.retryAfter || 60;
        const message = error.response.data?.message;
        startCountdown(retryAfter);
        toast.error(message);
      } else {
        toast.error(
          error.response?.data?.error || "Error processing your order"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Buy an ear of corn
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Premium Quality
        </Typography>

        {!!rateRetryAfter && (
          <Alert
            severity="warning"
            sx={{ mb: 3, mx: "auto", width: "fit-content" }}
          >
            Purchase limit reached. You can buy again in{" "}
            <strong>{countdown}</strong> seconds
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 400, width: "100%" }}>
            <CardMedia
              sx={{ borderRadius: "20px" }}
              component="img"
              image="/fresh-corn-on-the-cob.jpg"
              alt="corn-img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Fresh Corn
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Locally grown. Perfect for your favorite meals
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Sold by unit*
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={!rateRetryAfter && <ShoppingCart />}
                onClick={handleBuy}
                disabled={loading || !!rateRetryAfter}
              >
                {buttonText}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
