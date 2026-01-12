function Webmail() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <iframe 
        width="800" 
        height="600" 
        src="https://tailoredapps.pl/webmail/" 
        frameBorder="0" 
        allowFullScreen 
        title="webmail"
      />
    </div>
  );
}

export default Webmail;
