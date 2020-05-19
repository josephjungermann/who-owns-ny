//Code for first set of tabs
$(document).ready(function () {

	$("ul.tabs li").click(function () {
		var tab_id = $(this).attr("data-tab");

		$("ul.tabs li").removeClass('current');
		$(".tab-content").removeClass("current");

		$(this).addClass("current");
		$("#" + tab_id).addClass("current");
	})
})

//Code for second set of tabs

$(document).ready(function () {

	$("ul.tabs-two li").click(function () {
		var tab_id = $(this).attr("data-tab");

		$("ul.tabs-two li").removeClass('current');
		$(".tab-two-content").removeClass("current");

		$(this).addClass("current");
		$("#" + tab_id).addClass("current");
	})


})

//Code for Choose Your Own Adventure
// Based on code from https://codepen.io/phantomesse/pen/OPORwO

// Story paths
var story = {
	intro: {
		prompt: "Let’s say you’re pretty wealthy. You’re looking to move into a condo and decide 25 Central Park West is the place for you.",
		options: [{
			name: "Look for apartment listings.",
			path: "next"
    }]
	},
	next: {
		prompt: "There’s a unit for sale: 21J! The listing doesn’t have a price but in doing research, you stumble upon the comparative file above. You notice the GROSS SQUARE FEET of the unit is 3,393 sq. ft. How much money should you anticipate spending?",
		options: [{
			name: "More than $1 million",
			path: "more"
    }, {
			name: "Less than $1 million",
			path: "less_rip"
    }]
	},
	more: {
		prompt: "Good call. The Department of Finance values each square foot of the building at $393.08. That means the unit is valued at $1,333,720. Should you bring a bit more money just in case the Department of Finance undervalued the building?",
		options: [{
			name: "Just to be safe!",
			path: "safe"
		}, {
			name: "Nah, that sum is probably right.",
			path: "nah_rip"
    }]
	},
	safe: {
		prompt: "It does seem like it’ll go for more than its market value. How much more though?",
		options: [{
			name: "$18 million more",
			path: "eighteen"
		}, {
			name: "$8 million more",
			path: "eight_rip"
    }]
	},
	eighteen: {
		prompt: "Okay, $18 million more might be overkill... It’s actually $17,416,280 more. That’s right; it’s going for $18,750,000. That’s 1305.84% more than the unit’s market value! Good thing you brought enough. Congratulations on your new condo!",
		options: [{
			name: "Buy it again?",
			path: "intro"
    }]
	},
	less_rip: {
		prompt: "Oh no! Even by the Department of Finance’s standards, you’re a bit low. They value each square foot of the building at $393.08. Maybe you should look at other apartments.",
		options: [{
			name: "Try again.",
			path: "next"
    }]
	},
	eight_rip: {
		prompt: "You’re still about $10 million short. The unit actually costs $18,750,000. That’s 1305.84% more than the unit’s market value! You could save yourself the money and buy both of us a beer, instead.",
		options: [{
			name: "Try again.",
			path: "next"
    }]
	},
	nah_rip: {
		prompt: "Well, that’s embarrassing. You showed up a few million dollars short.",
		options: [{
			name: "Try again.",
			path: "next"
    }]
	}
}

function display_scenario(chosen_option) {
	var option_name = chosen_option.name;
	var option_path = chosen_option.path;
	var scenario = story[option_path];

	$('#prompt').empty();
	$('#options').empty();

	if (option_name) {
		$('<p>').html('You have chosen <b>' + option_name + '</b>').appendTo('#prompt');
	}

	$('<p>').html(scenario.prompt).appendTo('#prompt');

	function add_option_button(index) {
		if (index === scenario.options.length) {
			return;
		}

		var option = scenario.options[index];

		$('<button>')
			.html(option.name)
			.click(function (e) {

				e.preventDefault();
				display_scenario(option);
			})
			.appendTo('#options');

		add_option_button(index + 1);
	}
	add_option_button(0);
}

$(document).ready(function () {
	display_scenario({
		name: null,
		path: 'intro'
	});
});