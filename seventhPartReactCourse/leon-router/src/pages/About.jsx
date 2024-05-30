import PropTypes from "prop-types";
import { Link } from '../Link'
import { useI18n } from "../hooks/useI18n";

export default function AboutPage({ routesParams }) {
  const i18n = useI18n(routesParams?.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/78046399?v=4' alt='Foto de Leon' width='300' height='300' />
        <p>{i18n.description}</p>
      </div>
      <Link to='/' title='pagina principal'>{i18n.button}</Link>
    </>
  )
}

AboutPage.propTypes = {
  routesParams: PropTypes.object
}