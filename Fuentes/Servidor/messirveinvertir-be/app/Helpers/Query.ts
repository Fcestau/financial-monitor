import { LucidRow, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'

export async function preload(
  models: any[] | ModelPaginatorContract<LucidRow>,
  relations: string[]
) {
  // TODO Adonis preload method is not working! (null is loaded)
  await Promise.all(
    models.map((model) => Promise.all(relations.map((relation) => model.load(relation))))
  )
  return models
}
