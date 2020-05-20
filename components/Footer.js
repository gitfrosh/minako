const Footer = () => (
  <>
    <footer>
        <p>Copyright 2020 minako</p></footer>
    <style jsx>{`
      footer{
        clear: both;
        position: relative;
        height: 200px;
        padding: 4rem;
      }
      footer p {
        position: absolute;
        bottom: 0;
        left: 50%;
        
        transform: translate(-50%,-50%);
        /* or 3d alternative if you will add animations (smoother transitions) */
        transform: translate3d(-50%,-50%,0);
      }
      
    `}</style>
  </>
);

export default Footer;
