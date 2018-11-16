import lunr from 'lunr'

import lunr_index from '../assets/lunr_index.json'
import old_objects from '../assets/objects.json'


export const index = lunr.Index.load(lunr_index)


export const search = query => index.search(query)
export const tokens = Object.keys(index.invertedIndex)
export const objects = old_objects