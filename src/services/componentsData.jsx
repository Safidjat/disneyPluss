import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';

export const menuData=[
    {id:'1', linkTo:'/', name:'home',icon:<HomeIcon sx={{fontSize:'large'}} />},
    {id:'2', linkTo:'/search', name:'search',icon:<SearchIcon sx={{fontSize:'large'}} />},
    {id:'3', linkTo:'/wishes', name:'my list',icon:<PlaylistAddIcon sx={{fontSize:'large'}} />},
    {id:'4', linkTo:'/movies', name:'movies',icon:<LocalMoviesIcon sx={{fontSize:'large'}} />},
    {id:'5', linkTo:'/series', name:'series',icon:<MovieFilterIcon sx={{fontSize:'large'}} />}
];

export const topSliderData = [
    { id: 772, img: '/assets/img/1.jpg', overlay: '/assets/img/overlay1.jpg', alt: 'Home Alone Collection' },
    { id: 239770, img: '/assets/img/2.jpg', overlay: '/assets/img/overlay2.jpg', alt: 'Doctor Who' },
    { id: 456, img: '/assets/img/3.jpg', overlay: '/assets/img/overlay3.jpg', alt: 'The Simpsons' },
    { id: 335977, img: '/assets/img/4.jpg', overlay: '/assets/img/overlay4.jpg', alt: 'Indiana Jones Collection' },
];

export const collections = [
    { id:'1', src: "/assets/img/disneyCollection.jpg", alt: "Disney Collection", video:'/assets/mp4/disney1.mp4' },
    { id:'2', src: "/assets/img/pixarCollection.jpg", alt: "Pixar Collection", video:'/assets/mp4/pixar2.mp4' },
    { id:'3', src: "/assets/img/marvelCollection.jpg", alt: "Marvel Collection", video:'/assets/mp4/marvel3.mp4' },
    { id:'4', src: "/assets/img/starwarsCollection.jpg", alt: "Star Wars Collection", video:'/assets/mp4/starwars4.mp4' },
    { id:'5', src: "/assets/img/national-geographicCollection.jpg", alt: "National Geographic Collection", video:'/assets/mp4/national-geographic5.mp4' },
    { id:'6', src: "/assets/img/starCollection.jpg", alt: "Star Collection", video:'/assets/mp4/star6.mp4' },
];

export const genres=[
  {id:'1', name:'Action', num:'28', type:['movie']},
  {id:'2', name:'Adventure', num:'12', type:['movie']},
  {id:'3', name:'Animation', num:'16', type:['movie','series']},
  {id:'4', name:'Comedy', num:'35', type:['movie','series']},
  {id:'5', name:'Crime', num:'80', type:['movie','series']},
  {id:'6', name:'Documentary', num:'99', type:['movie','series']},
  {id:'7', name:'Drama', num:'18', type:['movie','series']},
  {id:'8', name:'Family', num:'10751', type:['movie','series']},
  {id:'9', name:'Fantasy', num:'14', type:['movie']},
  {id:'10', name:'Horror', num:'27', type:['movie']},
  {id:'11', name:'Mystery', num:'9648', type:['movie','series']},
  {id:'12', name:'Romance', num:'10749', type:['movie']},
  {id:'13', name:'Science Fiction', num:'878', type:['movie']},
  {id:'14', name:'Thriller', num:'53', type:['movie']},
  {id:'15', name:'Action & Adventure', num:'10759', type:'series'},
  {id:'16', name:'Kids', num:'10762', type:'series'},
  {id:'17', name:'News', num:'10763', type:'series'},
  {id:'18', name:'Reality', num:'10764', type:'series'},
  {id:'19', name:'Sci-Fi & Fantasy', num:'10765', type:'series'}
]

export const imgUrl='https://image.tmdb.org/t/p/original';
export const youTubeUrl='https://www.youtube.com/embed/';

export const mainVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7, 
    },
  },
};
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};
