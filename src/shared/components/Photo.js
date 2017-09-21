import React from 'react';
import { observer } from 'mobx-react';
import Grid from 'material-ui/Grid';

import DataStore from '../stores/DataStore';
import { FtLogo, LoadingDots } from './icons/Index';
import Single from './Single';

@observer
export default class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isGetting = DataStore.isGetting();
    const images = DataStore.retrieveImages();

    const imagesMap = images.map((data) => {
      const { description, tags, title, url } = data;
      return {
        checked: false,
        description,
        tags,
        title,
        url
      }
    });

    return (
      <div>

        <Grid
          container
          spacing={24}
        >

          { isGetting &&
            <Grid
              item
              xs={12}
            >
              <div
                className="isGetting"
              >
                <div
                  className="isGetting__row"
                >
                  <LoadingDots />
                </div>
                <div
                  className="isGetting__row"
                >
                  <FtLogo
                    color="#000000"
                    width={100}
                  />
                </div>
              </div>
            </Grid>
          }

          <div
            className="grid"
          >
            { imagesMap.length > 0 ?
              <Grid
                container
                spacing={24}
              >
                { imagesMap.map((data, i) =>
                  <Single
                    data={data}
                    key={i}
                  />
                )}
              </Grid>
              :
              <Grid
                item
                xs={12}
              >
                { !isGetting &&
                  <span>
                    No Photos found
                  </span>
                }
              </Grid>
            }
          </div>

        </Grid>

      </div>
    )
  }
}
