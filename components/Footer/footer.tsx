// app/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <h2>Connect with me</h2>
<ul className="social-icons">
  <li className="github">
    <a href="https://github.com/nugi32">
      <i className="fa fa-github"></i>
      <span className="title">GitHub</span>
    </a>
  </li>

  <li className="gmail">
    <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#search/nugrohoadhipratama135%40gmail.com?compose=new">
      <i className="fa fa-envelope"></i>
      <span className="title">Email</span>
    </a>
  </li>

  <li className="linkedin">
    <a href="https://www.linkedin.com/in/nugroho-adhipratama-28b973394/">
      <i className="fa fa-linkedin"></i>
      <span className="title">LinkedIn</span>
    </a>
  </li>
</ul>

    </footer>
  );
}
