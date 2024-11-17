import Lottie from 'react-lottie';
import noDataFound1 from '../animations/noDataFound1.json'

const NoDataFound = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: noDataFound1,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

  return (
    <Lottie options={defaultOptions} height={400} width={400} />
  )
}

export default NoDataFound;