/* Assignment 4: So You Think Ants Can Dance
 * UMN CSci-4611 Instructors 2012+
 * Significant changes by Prof. Dan Keefe, 2023 
 * Initial GopherGfx implementation by Evan Suma Rosenberg <suma@umn.edu> 2022
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * Please do not distribute beyond the CSci-4611 course
 */ 

import * as gfx from 'gophergfx'
import { AnimatedBone } from './AnimatedBone';
import { AnimatedCharacter } from './AnimatedCharacter'


/**
 * This character should draw an Ant or some other interesting custom 3D character by
 * adding geometry to the bones of the character.  We will assume the character's
 * skeleton is a humanoid skeleton in the CMU MoCap database format.  So, you can
 * selectively add geometry to the bone by checking the name of the bone using an
 * "if" statement as demonstrated in the support code.
 */
export class AntCharacter extends AnimatedCharacter
{
    private blackMaterial: gfx.UnlitMaterial;
    private antMaterial: gfx.PhongMaterial;

    constructor() {
        super();

        this.blackMaterial = new gfx.UnlitMaterial();
        this.blackMaterial.setColor(gfx.Color.BLACK);

        this.antMaterial = new gfx.PhongMaterial();
        this.antMaterial.ambientColor.set(0.7, 0, 0);
        this.antMaterial.diffuseColor.set(0.7, 0, 0);
        this.antMaterial.specularColor.set(0.7, 0.7, 0.7);
        this.antMaterial.shininess = 50;
    }


    public override addGeometryToAnimatedBone(bone: AnimatedBone): void
    {
        // PART 5: Create an character!
        //
        // For this part, create a convincing custom character out of basic
        // geometries. Start by creating a basic representation for *every* bone
        // (like you did in the SkeletonCharacter), and add additional
        // geometries for specific parts of the skeleton. We suggest drawing
        // geometries for at least the following parts (defined in the if
        // statement below):
        // - lowerback
        // - upperbackback
        // - thorax
        // - head
        //
        // A full list of available bones (and their hierarchical relationships)
        // can be seen in the skeleton files, for example /public/assets/data/05.asf.
        //
        // Lastly, add a face to the character! The character's face should
        // demonstrate your knowledge of composing transformations; at least one
        // part of the face should adjust the position, the rotation, and the
        // scale (like the antennae on the instructor solution).

        // PART 5.1: Draw specific parts of the character
        if (bone.name == 'lowerback')
        {
            const axisVec = new gfx.Vector3(0, 1, 0);
            const sphere = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1.6, 2.3, 1.6));
            sphere.material.setColor(gfx.Color.RED);
            const R = gfx.Matrix4.makeAlign(axisVec, bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -bone.length * 1.2, 0));
            const all = gfx.Matrix4.multiplyAll(R, T, S);
            sphere.setLocalToParentMatrix(all, false);
            bone.add(sphere);
        }
        else if (bone.name == 'upperback')
        {
            const axisVec = new gfx.Vector3(0, 1, 0);
            const sphere = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere.material.setColor(gfx.Color.RED);
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1.2, 1.5, 1.2));
            const R = gfx.Matrix4.makeAlign(axisVec, bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, 0, 0));
            const all = gfx.Matrix4.multiplyAll(R, T, S);
            sphere.setLocalToParentMatrix(all, false);
            bone.add(sphere);
        }
        else if (bone.name == 'thorax')
        {   
            const axisVec = new gfx.Vector3(0, 1, 0);
            const sphere = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere.material.setColor(gfx.Color.RED);
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1, 1.2, 1));
            const R = gfx.Matrix4.makeAlign(axisVec, bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
            const all = gfx.Matrix4.multiplyAll(R, T, S);
            sphere.setLocalToParentMatrix(all, false);
            bone.add(sphere);
        }
        else if (bone.name == 'head')
        {
            // PART 5.2: Add a face to the character

            //base of the head
            const axisVec = new gfx.Vector3(0, 1, 0);
            const sphere = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere.material.setColor(gfx.Color.RED);
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1.1, 1.6, 1.1));
            const R = gfx.Matrix4.makeAlign(axisVec, bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
            const all = gfx.Matrix4.multiplyAll(R, T, S);
            sphere.setLocalToParentMatrix(all, false);
            bone.add(sphere);

            //left eye
            const axisVec1 = new gfx.Vector3(0, 1, 0);
            const sphere1 = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere1.material.setColor(gfx.Color.BLACK);
            const S1 = gfx.Matrix4.makeScale(new gfx.Vector3(0.2, 0.4, 0.2));
            const R1 = gfx.Matrix4.makeAlign(axisVec1, bone.direction);
            const T1 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.05, bone.length/2, .1));
            const all1 = gfx.Matrix4.multiplyAll(R1, T1, S1);
            sphere1.setLocalToParentMatrix(all1, false);
            bone.add(sphere1);

            //right eye
            const axisVec2 = new gfx.Vector3(0, 1, 0);
            const sphere2 = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere2.material.setColor(gfx.Color.BLACK);
            const S2 = gfx.Matrix4.makeScale(new gfx.Vector3(0.2, 0.4, 0.2));
            const R2 = gfx.Matrix4.makeAlign(axisVec2, bone.direction);
            const T2 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.05, bone.length/2, .1));
            const all2 = gfx.Matrix4.multiplyAll(R2, T2, S2);
            sphere2.setLocalToParentMatrix(all2, false);
            bone.add(sphere2);

            //mouth
            const axisVec3 = new gfx.Vector3(0, 1, 0);
            const sphere3 = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere3.material.setColor(gfx.Color.BLACK);
            const S3 = gfx.Matrix4.makeScale(new gfx.Vector3(0.2, 0.1, 0.2));
            const R3 = gfx.Matrix4.makeAlign(axisVec3, bone.direction);
            const T3 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, -bone.length/2, .08));
            const all3 = gfx.Matrix4.multiplyAll(R3, T3, S3);
            sphere3.setLocalToParentMatrix(all3, false);
            bone.add(sphere3);

            //left anteni
            const axisVec4 = new gfx.Vector3(0, 1, 0);
            const sphere4 = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere4.material.setColor(gfx.Color.BLACK);
            const S4 = gfx.Matrix4.makeScale(new gfx.Vector3(0.09, 2.0, 0.09));
            const R4 = gfx.Matrix4.makeRotation(gfx.Quaternion.makeEulerAngles(0.7, 0, 0));
            const T4 = gfx.Matrix4.makeTranslation(new gfx.Vector3(-0.05, bone.length/2 * 3.5, 0.04));
            const all4 = gfx.Matrix4.multiplyAll(T4, R4, S4);
            sphere4.setLocalToParentMatrix(all4, false);
            bone.add(sphere4);

            //right anteni
            const axisVec5 = new gfx.Vector3(0, 1, 0);
            const sphere5 = gfx.Geometry3Factory.createSphere(0.1, 1.8);
            sphere5.material.setColor(gfx.Color.BLACK);
            const S5 = gfx.Matrix4.makeScale(new gfx.Vector3(0.09, 100.0, 0.09));
            const R5 = gfx.Matrix4.makeRotation(gfx.Quaternion.makeEulerAngles(0.7, 0, 0));
            const T5 = gfx.Matrix4.makeTranslation(new gfx.Vector3(0.05, bone.length/2 * 3.5, 0.04));
            const all5 = gfx.Matrix4.multiplyAll(T5, R5, S5);
            sphere5.setLocalToParentMatrix(all5, false);
            bone.add(sphere5);


        }
        else {
            const cylinder = gfx.Geometry3Factory.createCylinder(20, 0.01, 1);
            cylinder.material.setColor(gfx.Color.BLACK);

            //apply matricies to cylinder
            const axisVec = new gfx.Vector3(0, 1, 0);
            const S = gfx.Matrix4.makeScale(new gfx.Vector3(1, bone.length, 1));
            const R = gfx.Matrix4.makeAlign(axisVec, bone.direction);
            const T = gfx.Matrix4.makeTranslation(new gfx.Vector3(0, bone.length/2, 0));
            const all = gfx.Matrix4.multiplyAll(R, T, S);

            //add the cylinder to the scene 
            cylinder.setLocalToParentMatrix(all, false);
            bone.add(cylinder);
        }
        
    }
}
