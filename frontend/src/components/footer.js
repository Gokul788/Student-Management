
const Footer = (props) => {
  return (
    <footer className={`py-6 bg-${props.color}`}>
        <div className="container mx-auto text-center text-sm text-white">
          © 2024 Student Management | All Rights Reserved
        </div>
      </footer>
  );
};

export default Footer;
