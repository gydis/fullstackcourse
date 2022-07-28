import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification.shown ? (
    <div style={style}>{notification.text}</div>
  ) : (
    <div></div>
  );
};

export default Notification;

