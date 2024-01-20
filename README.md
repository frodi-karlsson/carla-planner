# carla-planner

This is intended to be a day planner built around making reusable events.
Mostly, this will be a way to schedule work days around self-alloted time slots. For example:

- Meeting 1h
- Standup 15m
- Lunch 30m
- Stretching 5m
- Code Reviews 1h
- Focus Time 2h
- etc.

Then you can schedule your day by drag-and-dropping these events into a calendar with an optional "Recurring" checkbox.

## Installation

You should probably be using yarn 4.0.2 as specified in `package.json.packageManager`.

```bash
yarn
```

## Development

```bash
yarn serve
```

## Build electron app

```bash
yarn electron:pack
```

For more granularity, you can get familiar with capacitor and @capacitor-community/electron.