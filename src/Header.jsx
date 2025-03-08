import trollFace from "../src/assets/troll-face.png";
export default function Header(){
    
    return(
        <header className="header">
            <img src={trollFace} alt="troll Face" />
            <h1>Meme Generator</h1>
        </header>

    )
}

