// Cette fonction prend pour argument une couleur (string) et retourne son code HEX

const convertColor = (name) => {
  switch (name) {
    case 'marronfoncé':
      return '#3C2312';
    case 'oeufpérimé':
      return '#F6C286';
    case 'caféaulaitchaud':
      return '#BB8557';
    case 'sable':
      return '#DDB892';
    case 'caféaulaitfroid':
      return '#B08968';
    case 'cannelle':
      return '#7F5539';
    case 'sucreroux':
      return '#9C6644';
    case 'pingouin':
      return '#7399BD';
    case 'océan':
      return '#1D487F';
    case 'poudrelibre':
      return '#FFEAD1';
    case 'transparent':
      return 'transparent';
    default:
      return '#7F5539';
  }
};

export default convertColor;
