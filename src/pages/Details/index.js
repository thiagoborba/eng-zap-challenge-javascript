import React from 'react';
import { Button, Container, Spacing, TextField, Title } from '../../Components';
import { useContext } from '../../Store';
import { getBusinessLabel, getPriceLabel } from '../../utils';

export const Details = ({ history }) => {
  const { state: { selectedProperty } }  = useContext()

  const {
    id,
    usableAreas,
    bedrooms,
    bathrooms,
    address: { city, neighborhood },
    pricingInfos: { businessType },
    parkingSpaces,
  } = selectedProperty

  return (
    <Container style={{ maxWidth: 600 }}>
      <Title variant='h5' align='center'>
        Detalhes do Imovel
      </Title>
      <Spacing height='40px'/>
      <Title paragraph align='center'>
        Confira abaixo as fotos e as informações detalhadas do imóvel selecionado 
      </Title>
      <Spacing height='40px'/>
      <TextField
        label={'Código de identificação'}
        value={id}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Tipo'}
        value={`imovel para ${getBusinessLabel(businessType)}`}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Valor'}
        value={getPriceLabel(selectedProperty.pricingInfos)}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Endereço'}
        value={`${ neighborhood } - ${city}`}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Quartos'}
        value={bedrooms}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Banheiros'}
        value={bathrooms}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Área útil'}
        value={`${usableAreas}/M²`}
        disabled
      />
      <Spacing height='16px'/>
      <TextField
        label={'Vagas de garagem'}
        value={parkingSpaces}
        disabled
      />
      <Spacing height='40px'/>
      <Button
        data-testid='back'
        children='Voltar'
        variant="outlined"
        color="primary"
        onClick={() => {
          history.goBack()
        }}
      />
    </Container>
  )
}

export default Details