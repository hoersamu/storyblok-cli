# How to translate storyblok pages using migrations

For more information on running migrations using the Storyblok CLI visit the [GitHub repository](https://github.com/storyblok/storyblok-cli).

## Generate migration
Create a migration file running the `generate-migration` command with the following parameters:

- `--space`: our Storyblok space id
- `--component`: the component to migrate
- `--field`: required but not used

```bash
npm run run generate-migration -- --space [ID_OF_STORYBLOK_SPACE] --component [COMPONENT_TO_PROCESS] --field [FIELD]
```

This command creates a migration file `change_[Component]_[field].js` in the migrations folder.

## Translate and update fields
Implement the translation logic within the migration function (located in the generated migration file).

### Plain text fields
Plain text fields are translated via DeepL using the `translateDeepL` util function.

### Richtext fields
Richtext fields are translated via OpenAI using the `translateOpenAI` util function.


## Run migration

### Manually
To run the migration, use the `run-migration` command with the same values for the parameters `--space`, `--component`, and `--field` as in the `generate-migration` command.

Use the `--starts-with` parameter to filter stories by path.

The `--dryrun` parameter can be used for debugging purposes.

```bash
npm run run run-migration -- --space [ID_OF_STORYBLOK_SPACE] --component [COMPONENT_TO_PROCESS] --field [FIELD] --starts-with [PATH_TO_FILTER_BY]
```

The command creates a backup file (`rollback_[Component]_[field].json`) for a potential rollback located in the `rollback` subfolder and performs the migration (expect when using `--dryrun`).

### Automated
Instead of running translation migrations manually, run the `run-migrations.sh` script. It will perform all migrations following the scheme `change_COMPONENT_translate.js` in the migrations folder for the path `en-US/untranslated`. To change the path, pass the `--starts-with` parameter to the script.


## Rollback migration
To undo changes performed by a migration, use the `rollback-migration` command with the same values for the parameters `--space`, `--component`, and `--field` as in the `run-migration` command.