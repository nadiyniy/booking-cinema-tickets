import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';

const Home = () => (
    <Box>
        <Container>
            <Typography variant="h1">Cinema Plus</Typography>
            <Typography variant="body1">
                Welcome to Cinemate Tickets, your ultimate destination for a seamless and enjoyable movie-going
                experience! At Cinemate Tickets, we`ve redefined the way you book tickets for the latest blockbusters.
                Our user-friendly platform is designed to make the ticket booking process quick, convenient, and
                hassle-free.
            </Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography>Effortless Booking</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Say goodbye to long queues and tedious processes. With Cinemate Tickets, you can effortlessly
                        browse through the latest movie listings, select your preferred showtimes, and secure your
                        tickets in just a few clicks.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel2-header">
                    <Typography>Wide Movie Selection</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Explore a diverse range of movies, from thrilling action-packed adventures to heartwarming
                        dramas. Our platform provides detailed information about each film, including trailers, reviews,
                        and cast details, helping you make informed choices.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel3-header">
                    <Typography>Real-Time Availability</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        No more disappointments at the box office. Cinemate Tickets provides real-time information on
                        seat availability, ensuring that you can book your favorite seats for the hottest releases
                        without any last-minute surprises.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel4-header">
                    <Typography>Special Offers and Promotions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Keep an eye out for exclusive deals and promotions. Cinemate Tickets regularly offers special
                        discounts, combo deals, and loyalty rewards to enhance your movie-going experience.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    </Box>
);

export default Home;
