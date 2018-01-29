import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from './header';
import SessionList from './session-list';

import View from './view';
import moment from 'moment';

import * as d3 from 'd3';
import * as topojson from 'topojson';

import { clearHotCountries } from '../actions/index';

function darken(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

class Earth extends React.Component {
    constructor() {
        super();

        this.hotCountries = [];

        this.state = {
           angle: 90,
        };
    }

    componentDidMount() {
        const context = this.refs.canvas.getContext('2d');

        const angle = 90;
        this.projection = d3.geoOrthographic()
                            .clipAngle(angle);

        this.path = d3.geoPath().
                       context(context).
                       projection(this.projection);

        var drag = d3.drag()
                     .on('drag', () => {
                         var dx = d3.event.dx;
                         var dy = d3.event.dy;

                         var rotation = this.projection.rotate();
                         var radius = this.projection.scale();

                         var scale = d3.scaleLinear()
                                       .domain([-1 * radius, radius])
                                       .range([-90, 90]);

                         var degX = scale(dx);
                         var degY = scale(dy);

                         rotation[0] += degX;
                         rotation[1] -= degY;

                         if (rotation[1] > 90)   rotation[1] = 90;
                         if (rotation[1] < -90)  rotation[1] = -90;
                         if (rotation[0] >= 180) rotation[0] -= 360;

                         this.projection.rotate(rotation);
                     });

        var zoom = d3.zoom()
                     .scaleExtent([50, 2000]);

        zoom
            .on('zoom', (event) => {
                this.projection.scale(d3.event.transform.k);
            });

        d3.select(this.refs.canvas).call(drag);
        d3.select(this.refs.canvas).call(zoom);

        d3.queue()
          .defer(d3.json, "https://unpkg.com/world-atlas@1/world/110m.json")
          .defer(d3.tsv, "https://unpkg.com/world-atlas@1/world/110m.tsv")
          .await((error, world, names) => {
              if (error) throw error;

              this.world = world;
              this.names = names;

              let countries = topojson.feature(world, world.objects.countries).features;
              this.countries = countries.filter((d) => {
                  return this.names.some((n) => {
                      if (d.id == n.iso_n3) return d.iso_a2 = n.iso_a2;
                  });
              }).sort((a, b) => {
                  return a.iso_a2.localeCompare(b.iso_a2);
              });

              requestAnimationFrame(() => {
                  this.loop();
              });
          });
    }

    componentDidUpdate() {
        if (!this.props.countries.length)
            return;

        let countries = this.countries;
        if (!countries)
            return;

        this.hotCountries = this.props.countries.reduce((red, value) => {
            let country = countries.find((v) => {
                return v.iso_a2 == value.isocode;
            });

            if (!country)
                return red;

            red.push({
                ...value,
                ...country,
            });

            return red;
        }, []);

        if (this.hotCountries.length == 0)
            return;

        // deduplicate
        // filter and use last t, and n++
        /*
        this.hotCountries = this.hotCountries.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
        */

        // sort on time
        this.hotCountries.sort(function (left, right) {
            return moment(left.last).utc().diff(moment(right.last).utc());
        });


        let last = this.hotCountries[this.hotCountries.length - 1]

        const p = d3.geoCentroid(last);

        let projection = this.projection;

        d3.transition()
          .duration(2500)
          .tween("rotate", () => {
              var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
              return (t) => {
                  projection.rotate(r(t));
              };
          });

        return
    }

    loop(time) {
        this.updateCanvas();

        requestAnimationFrame(() => {
            this.loop();
        });
    }

    updateCanvas() {
        let canvas = this.refs.canvas;
        if (!canvas)
            return;

        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        var world = this.world;
        var land = topojson.feature(world, world.objects.land);

        context.beginPath();

        this.path(land);
        context.fillStyle = 'white';
        context.fill();

        context.strokeStyle = 'gray';
        context.stroke();

        this.hotCountries.forEach((country) => {
            context.beginPath();
            const color = darken('#ff0100', 0 + (moment().diff(country.last, 'minutes') * 10));
            context.fillStyle = color;
            this.path(country);
            context.fill();
        });

        context.beginPath();
        context.fillStyle = 'white';
        this.path(topojson.mesh(world));
        context.stroke();
    }

    render() {
        return (
                <canvas style={{ 'cursor': 'move' }} ref="canvas" width={900} height={600}/>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Earth);
