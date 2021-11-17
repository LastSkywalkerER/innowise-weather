import Skyact from './Skyact';
import MyTitle2 from './MyTitle copy';

export default class MyTitle extends Skyact.SkyactComponent {
  render() {
    return Skyact.createElement('h1', {
      className: 'title',
    }, [this.props.message, this.props.children]);
  }
}