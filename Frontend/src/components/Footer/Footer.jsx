import {ReactComponent as LogoArcom} from "../../SVGS/LogoSVG.svg";
import './styles.scss'

function Footer() {
    return (
        <footer>
            <section className="footerDiv">
                <LogoArcom className="title"></LogoArcom>
                <p>
                    A MAPEX é o conjunto de Marcas Próprias e Exclusivas do Grupo Arcom, um dos maiores
                    atacadistas distribuidores do Brasil, com mais de 54 anos de mercado. Mapex, mais
                    presente do que você imagina.
            </p>
            </section>
            <section className="footerDiv2">
                <h1>Marcas</h1>
                <ul className="list">
                    <li>Starlux</li>
                    <li>Bozzano</li>
                    <li>Dentil</li>
                    <li>Starschool</li>
                    <li>Energizer</li>
                    <li>Eveready</li>
                    <li>Hershey’s</li>
                    <li>Trim</li>
                    <li>Isacare</li>
                    <li>Schick</li>
                    <li>Isababy</li>
                    <li>Winner</li>
                    <li>Bax</li>
                    <li>Coty</li>
                    <li>Banana Boat</li>
                    <li>Mapex</li>
                </ul>
            </section>
            <section className="footerDiv3">
                <h1>Contato</h1>
                <ul className="conteudo">
                    <li>Fale conosco</li>
                    <li>Perguntas frequentes</li>
                    <li>Grupo Arcom</li>
                    <li>Condições de uso</li>
                </ul>
            </section>
        </footer>
    );
}

export default Footer;