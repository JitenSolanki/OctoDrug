declare global {
    interface Window {
      JSME: any;
    }
  }
  
  export {};
  const initializeJSME = () => {
    if (window.JSME) {
      console.log('JSME Loaded');
      const params = {
        width: 600,
        height: 400,
        jme: 'sketcher',
        editable: true,
      };
      const editor = new window.JSME('sketcher', params);
      console.log('JSME Initialized');
    } else {
      console.error('JSME is not available');
    }
  };
  