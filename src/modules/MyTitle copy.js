import Skyact from './Skyact';

export default class MyTitle2 extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('h1', null, [this.props.message]);
  }
}