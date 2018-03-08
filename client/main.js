import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { App } from '../imports/ui';
import Player from '../imports/player';

$(document).ready(function($) {

    var player = new Player();
    player.init();

});

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});




