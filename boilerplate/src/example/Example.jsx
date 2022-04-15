import { useEffect, useState } from 'react';
import { KindleAPI } from '../Kindle';
import SudokuExample from './SudokuExample';

function Example() {
  const [debug, setDebug] = useState([]);
  const [state, setState] = useState(null);
  const [inputVal, setInputVal] = useState(localStorage.getItem('test_storage') || '');

  const onInputValChanged = (e) => {
    const val = e.target.value;
    setInputVal(val);
    localStorage.setItem('test_storage', val);
  };

  useEffect(() => {
    KindleAPI.chrome.setTitleBar('WAF Test App', 'WAF Test App');

    setState([
      {
        name: 'Device type',
        value: KindleAPI.device.getDeviceTypeString(),
      },
      {
        name: 'Software version',
        value: KindleAPI.device.getSoftwareVersionNumber(),
      },
      {
        name: 'Network',
        value: KindleAPI.net.isEnabled() ? 'enabled' : 'disable'
      },
      {
        name: 'Internet',
        value: KindleAPI.net.isConnected() ? 'connected' : 'not connected'
      },
      {
        name: 'DPI',
        value: KindleAPI.device.getDPI(),
      },
      {
        name: 'CSS pixels per inch',
        value: KindleAPI.device.getCSSPixelsPerInch(),
      },
    ]);

    let dbg = [];
    try {
      dbg = Object.getOwnPropertyNames(Object.getPrototypeOf(window));
    } catch (e) {
      dbg = [e.toString()];
    }
    setDebug(dbg);
  }, []);

  if (!state) return <h2>Loading...</h2>;

  return <div style={{ fontSize: '32px' }}>
    <button onClick={() => window.location.reload()}>Refresh</button><br/>
    <br/>
    Device status: <br/>

    <ul>
      {state.map(({name, value}, i) => <li key={i}>
        <b>{name}</b>: {value}
      </li>)}
    </ul>

    Test alert: <button onClick={() => window.alert('TODO: make this dialog better')}>click here</button> <br/>
    <br/>

    Test long list: <br/>
    <pre>
      {debug.map((l, i) => <span key={i}>{l}<br/></span>)}
    </pre>

    Test localStorage: Fill in the input below. Then quit the app and go back. <br/>
    <input placeholder="say something..." value={inputVal} onChange={onInputValChanged} />

    <br/><br/>
    Test layout: <br/>
    <SudokuExample />
  </div>;
}

export default Example;