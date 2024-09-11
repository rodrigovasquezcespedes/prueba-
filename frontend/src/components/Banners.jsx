import { Card, Row, Container } from 'react-bootstrap'
const Banners = () => {
  return (
    <>
      <h2 className='container my-5 text-center fs-1'>Tenemos lo último en tecnología</h2>

      <Container className='mt-5'>
        <Row>
          <div className='col-12 col-md-6 mb-3'>
            <Card>
              <Card.Img variant='top' className='pt-5 px-5' src='https://s3.us-east-2.amazonaws.com/ccp-prd-s3-uploads/2022/6/30/a751cb634fcf303a18782f156241b52c0d11822e.png' />
              <Card.Body>
                <Card.Title className='text-center pb-2'>Notebooks</Card.Title>
                <Card.Text />
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-md-6 mb-3'>
            <Card>
              <Card.Img variant='top' className='pt-5 px-5' src='https://imgmedia.larepublica.pe/640x371/larepublica/original/2021/07/23/60fb38c01db62136186d62c1.webp' />
              <Card.Body>
                <Card.Title className='text-center pb-3'>Celulares</Card.Title>
                <Card.Text />
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Container>

      <Container className='mb-3'>
        <Row>
          <div className='col-12 col-sm-12 col-md-4 mb-3'>
            <Card style={{ height: '25rem' }}>
              <Card.Body>
                <Card.Img src='https://assets.bosecreative.com/transform/607a7626-aaae-4e62-92e7-c2492622c6a5/QCHLE25_BlueDusk_001_RightFacing_RGB?quallity=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit' width='200px' alt='' />
                <Card.Title className='text-center'>Televisores</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-sm-12 col-md-4 mb-3'>
            <Card style={{ height: '25rem' }}>
              <Card.Body>
                <Card.Img src='https://assets.bosecreative.com/transform/607a7626-aaae-4e62-92e7-c2492622c6a5/QCHLE25_BlueDusk_001_RightFacing_RGB?quallity=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit' width='200px' alt='' />
                <Card.Title className='text-center'>Audio</Card.Title>
              </Card.Body>
            </Card>
          </div>

          <div className='col-12 col-sm-12 col-md-4 mb-3'>
            <Card style={{ height: '25rem' }}>
              <Card.Body>
                <Card.Img src='https://www.canontiendaonline.cl/wcsstore/CCHCatalogAssetStore/pro_clens_eos5d_markiv_ef24_105usm_01.jpg' width='200px' alt='' />
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
