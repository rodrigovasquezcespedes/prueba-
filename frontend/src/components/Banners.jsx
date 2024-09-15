import { Card, Row, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Banners = () => {
  const navigate = useNavigate()

  // Función para redirigir a la vista de productos con la categoría seleccionada
  const handleCardClick = (category) => {
    navigate(`/products?category=${category}`)
  }

  return (
    <>
      <h2 className='container my-5 text-center fs-1'>
        Tenemos lo último en tecnología
      </h2>

      <Container className='mt-5'>
        <Row>
          <div className='col-12 col-md-6 mb-3 d-flex justify-content-center'>
            <Card
              onClick={() => handleCardClick('Notebooks')}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '350px', height: '350px' }} // Ajustar tamaño
            >
              <div style={{ height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img
                  variant='top'
                  src='https://s3.us-east-2.amazonaws.com/ccp-prd-s3-uploads/2022/6/30/a751cb634fcf303a18782f156241b52c0d11822e.png'
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '100%' }} // Ajustar imagen
                />
              </div>
              <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='text-center'>Notebooks</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-md-6 mb-3 d-flex justify-content-center'>
            <Card
              onClick={() => handleCardClick('Celulares')}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '350px', height: '350px' }} // Ajustar tamaño
            >
              <div style={{ height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img
                  variant='top'
                  src='https://imgmedia.larepublica.pe/640x371/larepublica/original/2021/07/23/60fb38c01db62136186d62c1.webp'
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '100%' }} // Ajustar imagen
                />
              </div>
              <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='text-center'>Celulares</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>

      <Container className='mb-3'>
        <Row>
          <div className='col-12 col-sm-12 col-md-4 mb-3 d-flex justify-content-center'>
            <Card
              onClick={() => handleCardClick('Televisores')}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '350px', height: '350px' }} // Ajustar tamaño
            >
              <div style={{ height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img
                  src='https://images.philips.com/is/image/philipsconsumer/9500a7e441f2410fae72afb200ec5097?wid=700&hei=700&$pnglarge$'
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '100%' }} // Ajustar imagen
                />
              </div>
              <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='text-center'>Televisores</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-sm-12 col-md-4 mb-3 d-flex justify-content-center'>
            <Card
              onClick={() => handleCardClick('Audio')}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '350px', height: '350px' }} // Ajustar tamaño
            >
              <div style={{ height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img
                  src='https://assets.bosecreative.com/transform/607a7626-aaae-4e62-92e7-c2492622c6a5/QCHLE25_BlueDusk_001_RightFacing_RGB?quallity=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit'
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '100%' }} // Ajustar imagen
                />
              </div>
              <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='text-center'>Audio</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-sm-12 col-md-4 mb-3 d-flex justify-content-center'>
            <Card
              onClick={() => handleCardClick('Cámaras')}
              style={{ cursor: 'pointer', width: '100%', maxWidth: '350px', height: '350px' }} // Ajustar tamaño
            >
              <div style={{ height: '75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Img
                  src='https://www.canontiendaonline.cl/wcsstore/CCHCatalogAssetStore/pro_clens_eos5d_markiv_ef24_105usm_01.jpg'
                  style={{ width: '100%', objectFit: 'contain', maxHeight: '100%' }} // Ajustar imagen
                />
              </div>
              <Card.Body className='d-flex align-items-center justify-content-center'>
                <Card.Title className='text-center'>Cámaras</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Banners
