import { initFederation } from '@angular-architects/native-federation';

fetch('http://localhost:3000/manifest')
  .then((res) => res.json())
  .then((modules) => {
    // convert the data returned from the manifest to the format of native federation library
    // Record<{[appname]: "app remote url"}>
    const manifest = modules.reduce(
      (acc: any, m: any) => ({
        ...acc,
        [m.path]: m.remote,
      }),
      {}
    );

    return initFederation(manifest);
  })
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
