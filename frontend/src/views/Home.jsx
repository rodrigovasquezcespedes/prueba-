import { Card } from 'react-bootstrap'
import Testimonials from '../components/Testimonials'
import Banners from '../components/Banners'
import SignIn from '../components/SignIn'
import Services from '../components/Services'

const Home = () => {
  return (
    <>
      <Card className='col-12 mb-5'>
        <Card.Img className='hero' variant='top' src='https://framerusercontent.com/images/NmbCyFQg0KGfOurDReOCcuWcT0A.png' />
      </Card>
      <Banners />
      <SignIn />
      <Testimonials />
      <Services />
    </>
  )
}

export default Home
