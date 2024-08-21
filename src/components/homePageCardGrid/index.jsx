// import React from 'react';
// import { Grid, Card, CardContent, Typography } from '@mui/material';
// // import { makeStyles } from '@mui/styles';a

// // Custom styles using makeStyles
// const useStyles = makeStyles((theme) => ({
//   card: {
//     minHeight: '150px',
//     backgroundColor: '#f5f5f5',
//     '&:hover': {
//       backgroundColor: '#e0e0e0',
//     },
//   },
//   cardContent: {
//     textAlign: 'center',
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//   },
//   cardGrid: {
//     padding: '20px',
//   },
// }));

// const CardGrid = () => {
//   const classes = useStyles();

//   // Example data for the cards
//   const cards = Array.from({ length: 9 }, (_, index) => ({
//     id: index + 1,
//     title: `Card ${index + 1}`,
//     content: `This is the content of card ${index + 1}.`,
//   }));

//   return (
//     <Grid container spacing={3} className={classes.cardGrid}>
//       {cards.map((card) => (
//         <Grid item xs={12} sm={6} md={4} key={card.id}>
//           <Card className={classes.card}>
//             <CardContent className={classes.cardContent}>
//               <Typography variant="h5" component="div" className={classes.cardTitle}>
//                 {card.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {card.content}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default CardGrid;
