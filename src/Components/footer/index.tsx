import style from './styles.module.css'
export default function Footer(){
  return(
    <>
      <footer className={style.footer}>
        <div className={style.icones}>
          <img  src="/src/assets/facebook.png" alt="facebook" />
          <img src="/src/assets/twitter.png" alt="twitter" />
          <img src="/src/assets/instagram.png" alt="instagram" />
        </div>
      </footer>
    </>
  )
}