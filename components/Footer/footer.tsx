// app/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h2>Connect with me</h2>
<ul className="social-icons">
  <li className="facebook">
    <a href="#">
      <i className="fa fa-github"></i>
      <span className="title">GitHub</span>
    </a>
  </li>

  <li className="twitter">
    <a href="#">
      <i className="fa fa-whatsapp"></i>
      <span className="title">Chat</span>
    </a>
  </li>

  <li className="dribbble">
    <a href="#">
      <i className="fa fa-envelope"></i>
      <span className="title">Email</span>
    </a>
  </li>

  <li className="linkedin">
    <a href="#">
      <i className="fa fa-linkedin"></i>
      <span className="title">LinkedIn</span>
    </a>
  </li>
</ul>

    </footer>
  );
}
