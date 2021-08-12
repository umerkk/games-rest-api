import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Form, Input, TextArea, Button, Dropdown, Radio, Modal } from 'semantic-ui-react';
import axios from 'axios'
import GameImages from './types/GameImages';
import GameEvent from './types/GameEvent';

import './App.css';

const App: React.FC = () => {

  const defaultGameEvent: GameEvent = {
    author: '',
    category: '',
    description: '',
    duration: 0,
    images: [],
    isDownloadable: false,
    isPremium: false,
    isStreamable: false,
    replayBundleUrlJson: '',
    subtitle: '',
    tags: [],
    title: '',
    type: -1,
    version: 0
  }



  const [formImages, setImages] = useState<GameImages[]>([])
  const [imageId, setImageId] = useState<number>(0)
  const [tags, setTags] = useState<string[]>([])
  const [isSuccessful, setisSuccessful] = useState<boolean>(false);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [eventObject, setEventObject] = useState<GameEvent>(defaultGameEvent);

  const imageType = [
    {
      key: '1',
      text: 'SVG',
      value: '1',
    },
    {
      key: '2',
      text: 'PNG',
      value: '2',
    },
  ]

  useEffect(() => {
    setImages([{ id: imageId, url: '', type: 1 }, ...formImages])
    setImageId(imageId + 1);
    setTags([''])
  }, [])

  useEffect(() => {
    console.log(eventObject)
    console.log(formImages)
    console.log(tags)
  }, [eventObject, formImages, tags])

  async function handleOnSubmit() {

    setEventObject({ ...eventObject, images: [...formImages.filter((img) => !!img.type && !!img.url)] });
    setEventObject({ ...eventObject, tags: [...tags.filter((tag) => tag)] });

    try {
      const resp = await axios.post(`/games`, eventObject, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setisSuccessful(!isSuccessful)
    } catch (err) {
      setisSuccessful(false)
    }
    finally {
      setisModalOpen(true);
    }
  }

  function addNewImage() {
    setImages([...formImages, { id: imageId, url: '', type: 1 }])
    setImageId(imageId + 1);
  }

  function addNewTag() {
    setTags([...tags, '']);
  }
  return (
    <div className='App'>
      <div className='myForm'>
        <h1>Add a new Game Event </h1>
        <Form onSubmit={handleOnSubmit}>
          <Form.Field
            id='form-input-control-category'
            control={Input}
            label='Category'
            name='category'
            placeholder='Category'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, category: e.currentTarget.value })}
          />
          <Form.Field
            id='form-input-control-title'
            control={Input}
            label='Title'
            name='title'
            placeholder='Title...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, title: e.currentTarget.value })}
          />
          <Form.Field
            id='form-input-control-sub-title'
            control={Input}
            label='Sub Title'
            name='subtitle'
            placeholder='Sub Title...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, subtitle: e.currentTarget.value })}
          />
          <Form.Field
            id='form-input-control-description'
            control={TextArea}
            label='Description'
            name='description'
            placeholder='Description...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, description: e.currentTarget.value })}
          />
          <div className='image-input'>
            {formImages.map((item, index) => (
              <>
                <Form.Field
                  id='form-input-control-image-url'{...index}
                  control={Input}
                  label='Image Url'
                  name='image-url'{...index}
                  placeholder='Image...'
                  required
                  iconPosition='left'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    formImages[index].url = e.currentTarget.value;
                    setImages([...formImages]);
                  }}
                />
                <Dropdown
                  placeholder='Select a type'
                  fluid
                  selection
                  required
                  options={imageType}
                  onChange={(e: SyntheticEvent<HTMLElement>, { value }) => {
                    formImages[index].type = Number(value)
                    setImages([...formImages])
                  }}
                />
              </>
            ))
            }
            <Button className='imageButton' color='blue' type='button' icon='add' onClick={addNewImage}>Add new image</Button>
          </div>


          <Dropdown
            placeholder='Select a type'
            fluid
            selection
            required
            onChange={(e: SyntheticEvent<HTMLElement>, { value }) => setEventObject({ ...eventObject, type: Number(value) })}
            options={[
              {
                key: '1',
                text: 'Sports',
                value: '1',
              },
              {
                key: '2',
                text: 'Concert',
                value: '2',
              },
            ]}
          />

          <div className='image-input'>
            {tags.map((item, index) => (
              <>
                <Form.Field
                  id='form-input-control-tags'{...index}
                  control={Input}
                  label='Tags'
                  name='tags-'{...index}
                  placeholder='Tag...'
                  required
                  iconPosition='left'
                  onChange={(e: SyntheticEvent<HTMLInputElement>) => {
                    const newTags = [...tags];
                    newTags[index] = e.currentTarget.value;
                    setTags(newTags);
                  }}
                />
              </>
            ))
            }
            <Button className='imageButton' color='blue' type='button' icon='add' onClick={addNewTag}>Add tag</Button>
          </div>


          <Form.Field
            id='form-input-control-author'
            control={Input}
            label='Author'
            name='author'
            placeholder='Author...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, author: e.currentTarget.value })}
          />
          <Form.Field
            id='form-input-control-replayBundleUrlJson'
            control={Input}
            label='Replay Url'
            name='replayBundleUrlJson'
            placeholder='Replay Url...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, replayBundleUrlJson: e.currentTarget.value })}
          />

          <Form.Field
            id='form-input-control-duration'
            control={Input}
            label='duration'
            name='duration'
            placeholder='Duration...'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, duration: Number(e.currentTarget.value) })}
          />

          <Radio
            label='Downloadable'
            name='downloadable'
            placeholder='Downloadable?'
            toggle
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, isDownloadable: !(eventObject.isDownloadable) })}
          />
          <Radio
            label='Stremable'
            name='stremable'
            placeholder='Stremable?'
            toggle
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, isStreamable: !(eventObject.isStreamable) })}
          />
          <Form.Field
            id='form-input-control-version'
            control={Input}
            label='Version'
            name='version'
            placeholder='Version'
            required
            iconPosition='left'
            onChange={(e: React.FormEvent<HTMLInputElement>) => setEventObject({ ...eventObject, version: Number(e.currentTarget.value) })}
          />
          <Button type='submit' color='green'>Submit</Button>
        </Form>

        <Modal
          dimmer={true}
          open={isModalOpen}
        >
          <Modal.Header>Result</Modal.Header>
          <Modal.Content>
            {isSuccessful ? 'Your game listing has been successfully registered' : 'Error occured while adding your game listing'}
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={() => setisModalOpen(!isModalOpen)}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
}

export default App;
