import { capitalize } from "../helper/capitalize";
import {useSelector} from 'react-redux'

export default function Alert(props) {

  const alert = useSelector((state) => state.alert);

  return (

    <div style={{ height: "50px", position: "absolute" , width: "100%" }}>
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show `}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.message}
        </div>
      )}
    </div>
  );
}
