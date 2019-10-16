import {Surface, Module} from 'react-360-web';

import * as LocationService from '../services/location.service';
import {r360} from '../client';

export class WayTooltipModule extends Module {
  constructor() {
    super('WayTooltipModule');
  }

  roots = [];

  setTooltips(location) {
    this.detachAll();

    const tooltips = LocationService.getListWayTooltips(location);

    tooltips.map(item => {
      const surface = new Surface(item.width, item.height, Surface.SurfaceShape.Flat);
      surface.setAngle(item.yaw, item.pitch);
      this.roots.push(
        r360.renderToSurface(
          r360.createRoot('WayComponent', {
            width: item.width,
            height: item.height,
            source: 'icons/front.png',
            goesTo: item.goesTo,
          }),
          surface
        )
      );
    });
  }

  detachAll() {
    for (let i = 0; i < this.roots.length; i++) {
      r360.detachRoot(this.roots[i]);
    }
  }
}
