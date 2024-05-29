import { Link } from "../Link";

export default function Page404() {
  return (
    <div>
      <h1>404...This is fine</h1>
      <img alt="This is fine" src="https://midu.dev/images/this-is-fine-404.gif"
        style={{ display: "block", paddingBottom: "15px", marginLeft: "auto", marginBottom: "0", marginRight: "auto" }}
        loading="lazy"
      />
      <Link to='/' title={'volver al home'}>Volver al Home</Link>
    </div>
  )
}